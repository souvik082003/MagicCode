# Contributing to MagicCode

---

## 🗺️ Adding to the Learning Paths

MagicCode's entire curriculum (for C, C++, and DSA) is dynamically generated from an easy-to-read JSON configuration file. 

You don't need to write any React or database code to add a new lesson! You just need to modify the JSON.

### The File: `public/data/learning-paths.json`

This file contains an array of Path objects. Inside each path (like "c" or "cpp"), there is an array of `topics`.

Here is the exact structure required for a new Topic entry:

```json
{
  "id": "new-topic-id",
  "title": "Title of the Lesson",
  "level": 99, 
  "description": "A very short 1-sentence summary.",
  "content": {
    "definition": "A longer explanation of what this concept is.",
    "syntax": "int main() {\n  return 0;\n}",
    "whyUse": "Explain why a developer would use this in the real world.",
    "examples": [
      {
        "title": "Example Case 1",
        "code": "printf(\"Hello World\");",
        "explanation": "What this code does."
      }
    ]
  }
}
```

### Contribution Steps:

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your content (e.g., `git checkout -b feature/add-graphs-to-dsa`).
3. Open `public/data/learning-paths.json`.
4. Locate the path you want to expand (e.g., `"id": "dsa"`).
5. Add your new topic object to the `topics` array. 
   - *Important Ensure the `level` integer is strictly sequential following the previous topic.*
6. **Test your changes locally** by running `npm run dev` and verifying the topic renders correctly in the Side Panel on the Learning Path map.
7. **Commit your changes**: `git commit -m "Add distinct guide on Graph Traversals"`
8. **Push to your fork**: `git push origin feature/add-graphs-to-dsa`
9. **Open a Pull Request** against the main MagicCode repository!

## 🐛 Found a Bug?
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our GitHub Repository. Even better, you can submit a Pull Request with a fix!

Thank you for helping us make computer science education accessible and fun.
- **Souvik Samanta** & The MagicCode Community
