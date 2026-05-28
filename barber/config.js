// ============================================================
// config.js - Shared Supabase configuration
// ============================================================
// Replace these with your actual Supabase project credentials
// found at: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

const SUPABASE_CONFIG = {
  url: 'https://ndqddglyjlccmvechjbb.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcWRkZ2x5amxjY212ZWNoamJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDcyMDQsImV4cCI6MjA5NTIyMzIwNH0.kMoGDyIHCt1q25soG-MEbQjFayfG2FH_AGFReKz6f9I',
  shopId: 'shop_1',

  // n8n webhook URL for notifications
  // Set this to your n8n webhook URL after importing the workflow
  n8nWebhookUrl: 'https://n8n.srv1058135.hstgr.cloud/webhook/barber-queue',
};

// Utility: trigger n8n notification webhook
async function triggerNotification(event, data) {
  if (!SUPABASE_CONFIG.n8nWebhookUrl || SUPABASE_CONFIG.n8nWebhookUrl.includes('YOUR_N8N')) {
    console.log('[MOCK NOTIFICATION]', event, data);
    return;
  }
  try {
    await fetch(SUPABASE_CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, ...data }),
    });
  } catch (err) {
    console.error('Notification webhook failed:', err);
  }
}
