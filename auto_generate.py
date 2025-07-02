import json
import subprocess
from datetime import datetime

# 新文章数据
NEW_ARTICLES = [
    {
        "title": "Python自动化脚本开发",
        "content": "学习如何使用Python编写高效的自动化脚本，提高工作效率。"
    },
    {
        "title": "现代Web开发技术栈",
        "content": "探索2023年最流行的Web开发技术组合和最佳实践。"
    }
]

def main():
    # 运行生成脚本
    for article in NEW_ARTICLES:
        cmd = f"python generate_industry_report.py --title \"{article['title']}\" --content \"{article['content']}\""
        subprocess.run(cmd, shell=True)
    
    print("文章生成完成！")

if __name__ == "__main__":
    main()