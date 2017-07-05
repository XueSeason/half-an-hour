#include <iostream>
#include "./buf.h"

extern const int bufSize;

int main() {
    std::cout << bufSize << std::endl;

    const int ci = 1024;
    // 常量引用
    const int &r1 = ci;
    // int &r2 = r1;
    // ci = 2048;

    // 下面可以拆分为
    // const int temp = 10;
    // const int &r2 = temp;
    const int &r2 = 10;
    // 下面会报错，无法绑定临时变量
    // int &r3 = 10;

    const double pi = 3.14;
    // double *ptr = &pi; // 报错，ptr 是一个普通指针
    const double *cptr = &pi;

    int errNumb = 0;
    int *const curErr = &errNumb; // curErr 将永远指向 errNumb
    const double *const pip = &pi; // pip 是一个指向常量对象的常量指针

    return 0;
}
