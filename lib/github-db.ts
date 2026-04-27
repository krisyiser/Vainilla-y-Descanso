const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'krisyiser';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Vainilla-y-Descanso';
const DB_PATH = 'data/db.json';

export async function getDB() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DB_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) throw new Error('Could not fetch DB from GitHub');

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString();
    return {
      content: JSON.parse(content),
      sha: data.sha,
    };
  } catch (error) {
    console.error('GitHub DB Error:', error);
    return null;
  }
}

export async function updateDB(newContent: any, sha: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DB_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update Hotel Database 🏨',
          content: Buffer.from(JSON.stringify(newContent, null, 2)).toString('base64'),
          sha,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('GitHub DB Update Error:', error);
    return false;
  }
}
