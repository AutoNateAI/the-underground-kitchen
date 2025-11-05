import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();
const db = admin.firestore();

// Notification when a new lead is created
export const onLeadCreate = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snap, context) => {
    const lead = snap.data();
    const leadId = context.params.leadId;

    console.log('New lead created:', leadId, lead);

    // Send Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🍔 New ${lead.type} lead from ${lead.name}`,
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: `New ${lead.type} Lead`,
                  emoji: true,
                },
              },
              {
                type: 'section',
                fields: [
                  { type: 'mrkdwn', text: `*Name:*\n${lead.name}` },
                  { type: 'mrkdwn', text: `*Email:*\n${lead.email}` },
                  { type: 'mrkdwn', text: `*Phone:*\n${lead.phone || 'N/A'}` },
                  { type: 'mrkdwn', text: `*Type:*\n${lead.type}` },
                ],
              },
              ...(lead.type === 'catering'
                ? [
                    {
                      type: 'section',
                      fields: [
                        {
                          type: 'mrkdwn',
                          text: `*Event Date:*\n${lead.eventDate || 'N/A'}`,
                        },
                        {
                          type: 'mrkdwn',
                          text: `*Headcount:*\n${lead.headcount || 'N/A'}`,
                        },
                        {
                          type: 'mrkdwn',
                          text: `*Budget:*\n${lead.budgetRange || 'N/A'}`,
                        },
                      ],
                    },
                  ]
                : []),
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*Message:*\n${lead.message || 'No message provided'}`,
                },
              },
            ],
          }),
        });
        console.log('Slack notification sent');
      } catch (error) {
        console.error('Error sending Slack notification:', error);
      }
    }

    // Send email notification via SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.LEADS_NOTIFY_EMAIL) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: process.env.LEADS_NOTIFY_EMAIL }],
              },
            ],
            from: {
              email: 'no-reply@undergroundkitchen.com',
              name: 'The Underground Kitchen',
            },
            subject: `New ${lead.type} Lead: ${lead.name}`,
            content: [
              {
                type: 'text/html',
                value: `
                  <h2>New ${lead.type} Lead</h2>
                  <p><strong>Name:</strong> ${lead.name}</p>
                  <p><strong>Email:</strong> ${lead.email}</p>
                  <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
                  ${
                    lead.type === 'catering'
                      ? `
                    <p><strong>Event Date:</strong> ${lead.eventDate || 'N/A'}</p>
                    <p><strong>Headcount:</strong> ${lead.headcount || 'N/A'}</p>
                    <p><strong>Budget:</strong> ${lead.budgetRange || 'N/A'}</p>
                  `
                      : ''
                  }
                  <p><strong>Message:</strong><br/>${lead.message || 'No message'}</p>
                  <p><strong>Created:</strong> ${lead.createdAt}</p>
                `,
              },
            ],
          }),
        });
        console.log('Email notification sent');
      } catch (error) {
        console.error('Error sending email notification:', error);
      }
    }

    return null;
  });

// Generate RSS feed for blog posts
export const rssBlog = functions.https.onRequest(async (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://undergroundkitchen.com';
  
  const snapshot = await db
    .collection('posts')
    .where('type', '==', 'blog')
    .orderBy('publishedAt', 'desc')
    .limit(50)
    .get();

  const items = snapshot.docs.map((doc) => {
    const post = doc.data();
    return `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}/community/b/${post.slug}</link>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <guid>${doc.id}</guid>
        <description>${post.excerpt || ''}</description>
      </item>
    `;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Underground Kitchen Blog</title>
    <link>${siteUrl}</link>
    <description>Stories, recipes, and insights from Grand Rapids' next-gen burger joint</description>
    ${items.join('')}
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml');
  res.send(rss);
});

// Generate RSS feed for podcast episodes
export const rssPodcast = functions.https.onRequest(async (req, res) => {
  const siteUrl = process.env.SITE_URL || 'https://undergroundkitchen.com';
  
  const snapshot = await db
    .collection('posts')
    .where('type', '==', 'podcast')
    .orderBy('publishedAt', 'desc')
    .limit(50)
    .get();

  const items = snapshot.docs.map((doc) => {
    const post = doc.data();
    return `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}/community/p/${post.slug}</link>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <guid>${doc.id}</guid>
        <description>${post.excerpt || ''}</description>
        ${post.audioUrl ? `<enclosure url="${post.audioUrl}" type="audio/mpeg" />` : ''}
        ${post.duration ? `<itunes:duration>${post.duration}</itunes:duration>` : ''}
      </item>
    `;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>The Underground Kitchen Podcast</title>
    <link>${siteUrl}</link>
    <description>Conversations about burgers, food culture, and the Grand Rapids scene</description>
    ${items.join('')}
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml');
  res.send(rss);
});




