#include <iostream>

int main() {
    // 初始化不是赋值，初始化表示创建一个变量时赋予一个初始值
    // 赋值表示把对象的当前值擦除，用一个新的值代替
    // int units_sold = 0;
    int units_sold = {0};
    // int units_sold(0);
    // int units_sold{0}; // 列表初始化
    std::cout << units_sold << std::endl;

    // long double ld = 3.1415926;
    // int a{ld}, b = {ld};
    // int c(ld), d = ld;
    // std::cout << a << b << c << d << std::endl;

    // 声明：是的名字为程序所知，可以多次声明
    // 定义：负责创建与名字关联的实体，只能定义一次
    // 如果声明一个变量而非定义它，使用 extern 关键字，而且不要显式初始化
    extern int i;
    // extern int j = 1; 无法进行初始化

    // 左值引用 引用即别名
    int ival = 1024;
    int &refVal = ival;
    int &refVal2 = refVal;
    refVal2 = 10;
    // int &refVal3 = 123;
    std::cout << refVal2 << std::endl;

    // 指针
    // 指针存放对象地址
    int *p = &ival;
    // 空指针
    // int *p1 = 0;
    // int *p1 = NULL;
    // int *p1 = nullptr
    std::cout << *p << std::endl;

    int *&pref = p;
    std::cout << "指针 p 的地址: " << &p << std::endl;
    std::cout << "指针 p 的值: " << p << std::endl;
    std::cout << "指针 p 指向的值: " << *p << std::endl;
    std::cout << "引用 perf 的地址: " << &pref << std::endl;
    std::cout << "引用 perf 的值: " << pref << std::endl;
    std::cout << "引用 perf 指向的值: " << *pref << std::endl;

    // void* 指针
    // 用于存放任意对象的地址，无法访问内存空间的值
    double obj = 3.14, *pd = &obj;
    void *pv = &obj;
    pv = pd;
    // std::cout << *pv << std::endl;
}