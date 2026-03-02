import { ProblemDefinition } from "@/types/problem";

export const fallbackProblems: Record<string, ProblemDefinition> = {
    "hello-world": {
        id: "hello-world",
        title: "1. Hello World",
        difficulty: "Easy",
        category: "Basics",
        language: "c",
        description: `<p>Write a program that prints exactly <code class="bg-muted px-1 py-0.5 rounded text-primary">Hello World!</code> to the standard output.</p>`,
        template: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
        testCases: [
            { input: "", expectedOutput: "Hello World!" }
        ]
    },
    "variables": {
        id: "variables",
        title: "2. Variables & Types",
        difficulty: "Easy",
        category: "Basics",
        language: "cpp",
        description: `<p>Declare an integer variable <code>a</code> with value 10, and a string variable <code>b</code> with value "Code". Print them separated by a space.</p>`,
        template: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
        testCases: [
            { input: "", expectedOutput: "10 Code" }
        ]
    },
    "two-sum": {
        id: "two-sum",
        title: "3. Two Sum",
        difficulty: "Medium",
        category: "Arrays",
        language: "cpp",
        description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>`,
        template: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};',
        driverCode: '#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    int n, target;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cin >> target;\n    Solution sol;\n    vector<int> res = sol.twoSum(nums, target);\n    for(size_t i=0; i<res.size(); i++) cout << res[i] << (i==res.size()-1 ? "" : " ");\n    cout << endl;\n    return 0;\n}',
        testCases: [
            { input: "4\n2 7 11 15\n9", expectedOutput: "0 1" }
        ]
    },
    "reverse-string": {
        id: "reverse-string",
        title: "4. Reverse String",
        difficulty: "Easy",
        category: "Strings",
        language: "cpp",
        description: `<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>`,
        template: 'class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your code here\n        \n    }\n};',
        driverCode: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    string input;\n    if (!(cin >> input)) return 0;\n    vector<char> s(input.begin(), input.end());\n    Solution sol;\n    sol.reverseString(s);\n    for(char c : s) cout << c;\n    cout << endl;\n    return 0;\n}',
        testCases: [
            { input: "hello", expectedOutput: "olleh" }
        ]
    },
    "linked-list-cycle": {
        id: "linked-list-cycle",
        title: "5. Linked List Cycle",
        difficulty: "Medium",
        category: "Data Structures",
        language: "cpp",
        description: `<p>Determine if a linked list has a cycle. For this simple simulator, print "true" if the input string contains "cycle", otherwise "false".</p>`,
        template: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string input;\n    cin >> input;\n    // Write logic\n    return 0;\n}',
        testCases: [
            { input: "1->2->3->cycle", expectedOutput: "true" },
            { input: "1->2->3->null", expectedOutput: "false" }
        ]
    },
    "pointers-intro": {
        id: "pointers-intro",
        title: "6. Intro to Pointers",
        difficulty: "Hard",
        category: "Pointers",
        language: "c",
        description: `<p>Read two integers. Use a pointer to swap their values, then print them separated by a space.</p>`,
        template: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Implement swap\n}\n\nint main() {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    swap(&x, &y);\n    printf("%d %d", x, y);\n    return 0;\n}',
        testCases: [
            { input: "5 10", expectedOutput: "10 5" }
        ]
    }
};
