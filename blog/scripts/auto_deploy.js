const { changeTheme, getCurrentTheme } = require('./change_theme');
const generatePost = require('./generate_post');
const { recordView, getTrafficReport } = require('./traffic_monitor');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 确保数据目录存在
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

function runCommand(command) {
  try {
    console.log(`执行命令: ${command}`);
    const output = execSync(command, { 
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error(`命令执行失败: ${command}`);
    console.error(error.message);
    return false;
  }
}

function generateReport() {
  const report = getTrafficReport();
  const reportContent = `# 博客访问报告 (${new Date().toLocaleDateString()})

## 总览
${report.summary}

## 热门分类
${report.topCategories.join('\n')}

## 热门文章
${report.topPosts.map((post, i) => 
  `${i+1}. ${post.id} (浏览: ${post.views}次)`
).join('\n')}

当前主题: ${getCurrentTheme()}
`;

  fs.writeFileSync(
    path.join(dataDir, 'latest_report.md'),
    reportContent
  );
}

function autoDeploy() {
  console.log('开始自动部署流程...');
  
  // 1. 生成新文章
  const postInfo = generatePost();
  
  // 2. 记录访问数据 (模拟)
  recordView(postInfo.id, postInfo.category);
  
  // 3. 切换主题
  const newTheme = changeTheme();
  console.log(`使用主题: ${newTheme}`);
  
  // 4. 生成访问报告
  generateReport();
  
  // 5. 清理并生成静态文件
  if (!runCommand('hexo clean')) return;
  if (!runCommand('hexo generate')) return;
  
  // 6. 部署到GitHub
  if (runCommand('hexo deploy')) {
    console.log('自动部署完成!');
  } else {
    console.error('自动部署失败');
  }
}

autoDeploy();