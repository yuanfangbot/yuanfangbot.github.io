#!/usr/bin/env python3
"""
行业报告自动生成工具
根据数据源和模板自动生成各行业分类报告
"""

import json
from pathlib import Path
from datetime import datetime

# 模板目录
TEMPLATE_DIR = "industry_templates"

# 加载模板
def load_template(template_name):
    template_path = Path(TEMPLATE_DIR) / f"{template_name}.md"
    with open(template_path, "r", encoding="utf-8") as f:
        return f.read()

# 生成报告
def generate_report(data, template_type):
    # 获取对应模板
    template = load_template(template_type)
    
    # 生成动态内容
    today = datetime.now().strftime("%Y-%m-%d")
    report = template.replace("{date}", today)
    
    # 根据不同类型处理数据
    if template_type == "global_top10":
        # 处理全球TOP10行业数据
        industries = "\n".join(
            f"{i+1}. {ind['emoji']} **{ind['name']}** - {ind['value']}\n"
            f"   - {ind['highlight1']}\n"
            f"   - {ind['highlight2']}"
            for i, ind in enumerate(data["industries"])
        )
        report = report.replace("{industries}", industries)
        
    elif template_type == "hot_growth":
        # 处理高增长行业数据
        industries = []
        for ind in data["industries"]:
            item = f"{ind['emoji']} **{ind['name']}**\n"
            item += f"   - {ind['trend1']}\n"
            item += f"   - {ind['trend2']}\n"
            if "resources" in ind:
                item += "   \n🎓 **学习资源**:\n"
                item += "   - " + "\n   - ".join(ind["resources"])
            industries.append(item)
        report = report.replace("{industries}", "\n\n".join(industries))
    
    # 其他模板类型的处理...
    
    return report

# 主函数
def main():
    # 示例数据
    sample_data = {
        "global_top10": {
            "industries": [
                {
                    "name": "人寿与健康保险",
                    "value": "约 $5.53万亿",
                    "emoji": "🏦",
                    "highlight1": "人口老龄化驱动需求",
                    "highlight2": "数字化保险服务崛起"
                },
                # 其他行业数据...
            ]
        },
        # 其他分类数据...
    }
    
    # 生成示例报告
    report = generate_report(sample_data["global_top10"], "global_top10")
    print(report)

if __name__ == "__main__":
    main()