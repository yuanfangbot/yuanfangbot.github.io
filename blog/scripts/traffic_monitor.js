const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/traffic_data.json');

// 初始化数据文件
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({
    totalViews: 0,
    categoryViews: {
      tech: 0,
      lifestyle: 0,
      business: 0,
      travel: 0,
      food: 0
    },
    popularPosts: [],
    lastUpdated: new Date().toISOString()
  }, null, 2));
}

function recordView(postId, category) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // 确保数据结构完整
  if (!data.totalViews) data.totalViews = 0;
  if (!data.categoryViews) data.categoryViews = {};
  if (!data.popularPosts) data.popularPosts = [];
  
  // 更新总浏览量
  data.totalViews += 1;
  
  // 更新分类浏览量
  if (!data.categoryViews[category]) {
    data.categoryViews[category] = 1;
  } else {
    data.categoryViews[category] += 1;
  }
  
  // 更新热门文章列表
  const postIndex = data.popularPosts.findIndex(p => p.id === postId);
  if (postIndex >= 0) {
    data.popularPosts[postIndex].views += 1;
  } else {
    data.popularPosts.push({
      id: postId,
      title: '',
      views: 1,
      lastViewed: new Date().toISOString()
    });
  }
  
  // 按浏览量排序
  data.popularPosts.sort((a, b) => b.views - a.views);
  data.lastUpdated = new Date().toISOString();
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getTrafficReport() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    summary: `总浏览量: ${data.totalViews}`,
    topCategories: Object.entries(data.categoryViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, views]) => `${cat}: ${views}次`),
    topPosts: data.popularPosts.slice(0, 5)
  };
}

module.exports = { recordView, getTrafficReport };