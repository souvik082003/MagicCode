const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const driverCodeCpp = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

{{USER_CODE}}

int main() {
    int n, target;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for(int i=0; i<n; i++) cin >> nums[i];
    cin >> target;
    Solution sol;
    vector<int> res = sol.twoSum(nums, target);
    for(size_t i=0; i<res.size(); i++) cout << res[i] << (i==res.size()-1 ? "" : " ");
    cout << endl;
    return 0;
}`;

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const collection = mongoose.connection.db.collection('problems');

        console.log("Updating problems...");

        await collection.updateMany(
            { title: "Two sum" },
            {
                $set: {
                    driverCode: driverCodeCpp,
                    language: "cpp", // Standardize language since one was accidentally set to JS
                    template: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};\n"
                }
            }
        );

        console.log("Database update complete! You can run the code now.");
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}
run();
