const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const postsDir = path.join(__dirname, '../source/_posts');
const now = new Date();

// 内容库 - 更自然的标题和内容
const contentLibrary = {
  tech: [
    { 
      title: "从传统编程到智能编码的转变历程",
      content: `记得刚开始学习编程时，我常常为了一个简单的bug调试到深夜。如今，随着智能编码助手的发展，这些情况已经大大改善。上周我在项目中使用了新的代码补全工具，它不仅能预测我的编码意图，还能根据上下文提供优化建议。\n\n不过工具终究是工具，程序员的核心思维仍然不可或缺。最近参加的技术沙龙上，多位资深开发者分享了他们如何平衡人工编码与AI辅助的经验。`
    },
    {
      title: "现代前端开发的五个实用技巧",
      content: `在最近的项目重构中，我总结了几个提升效率的方法：\n1. 组件化设计模式\n2. 状态管理的最佳实践\n3. 性能优化小技巧\n4. 团队协作规范\n5. 调试工具的高级用法\n\n这些技巧在我们团队的新项目中得到了验证，开发效率提升了约40%。`
    }
  ],
  lifestyle: [
    {
      title: "数字游民的工作与生活平衡术",
      content: `去年我开始尝试远程工作，最初以为会很轻松，实际却面临诸多挑战。经过一年摸索，我总结出几个关键点：\n\n• 建立固定的作息时间\n• 划分明确的工作区域\n• 使用合适的协作工具\n• 定期与团队线下聚会\n• 培养工作外的兴趣爱好\n\n现在我的工作效率反而比在办公室时更高，也有更多时间陪伴家人。`
    }
  ],
  // 更多分类和内容...
};

// 已生成内容记录
let generatedHistory = [];
let postCount = 0;

function getUniqueContent(category) {
  const available = contentLibrary[category].filter(item => 
    !generatedHistory.includes(item.title)
  );
  
  if (available.length === 0) {
    generatedHistory = []; // 重置记录
    return contentLibrary[category][0];
  }
  
  const selected = available[Math.floor(Math.random() * available.length)];
  generatedHistory.push(selected.title);
  return selected;
}

function generatePost() {
  postCount++;
  const categories = Object.keys(contentLibrary);
  const currentCategory = categories[postCount % categories.length];
  const {title, content} = getUniqueContent(currentCategory);
  
  const fileName = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${title.replace(/\s+/g, '-')}.md`;
  
  const postContent = `---
title: "${title}"
date: ${now.toISOString()}
tags: [实用技巧, 经验分享]
categories: ${currentCategory}
---

${content}

<section class="discussion">
  <h3>读者互动</h3>
  <p>你有类似的经历或不同的看法吗？欢迎在评论区分享你的故事~</p>
</section>
`;

  fs.writeFileSync(path.join(postsDir, fileName), postContent);
  console.log(`生成新文章: ${fileName} [${currentCategory}]`);
  
  return {
    id: fileName.replace('.md', ''),
    title: title,
    category: currentCategory,
    path: fileName
  };
}

module.exports = generatePost;