#include <iostream>

int main() {
    unsigned u = 11;
    while (u > 0) {
        --u;
        std::cout << u << std::endl;
    }

    std::cout << "a really, really long string literal "
                "that spans two lines." << std::endl;

    // 泛化转义序列
    std::cout << "Hi \x4dO\115!\n";

    std::cout << 10.f << 012;
}

// int main() {
//     unsigned u = 10;
//     int i = -42;
//     unsigned u1 = 42, u2 = 10;
//     // 4294967264 （无符号整型 -32 对无符号表示数值总数取模结果，此时 int 为 32 位）
//     std::cout << u + i << std::endl;
//     std::cout << u2 - u1 << std::endl;
//     return 0;
// }

// int main() {
//     // 死循环
//     for (unsigned u = 10; u >= 0; u--) {
//         std::cout << u << std::endl;
//     }
// }