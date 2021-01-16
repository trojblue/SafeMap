# 推荐系统



- flask
- 读取covid_cases_total和all_hospitals_in_toronto



逻辑

1. 输入经纬度, 找到最近的25个医院
2. 输出: 这25个里面 (1 直线距离最近      2 感染率最低             3 最近且支持walk-in)的医院