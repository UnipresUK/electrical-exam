# Electrical Drawing Exam — UPUK0001

A web-based exam for apprentice electricians, hosted on GitHub Pages.

## How to Edit Questions

Open `questions.json` in any text editor (or directly on GitHub). Each question is an object:

```json
{
  "section": "Section A — Terminology (1 mark each)",
  "q": 1,
  "text": "Your question text here?",
  "marks": 1,
  "image": null,
  "answer": "The model answer that the reviewer will see."
}
```

### Fields:
| Field | Description |
|-------|-------------|
| `section` | Section heading (only needed on first question of each section, use `null` for others) |
| `q` | Question number |
| `text` | The question text shown to the apprentice |
| `marks` | How many marks the question is worth |
| `image` | Path to an image file (e.g. `"images/my-diagram.jpg"`) or `null` for no image |
| `answer` | The model answer shown to the reviewer after submission |
| `options` | *(Optional)* Array of multiple choice options, e.g. `["Option A", "Option B", "Option C"]` |

### Adding Images
1. Add your image file to the `images/` folder
2. Set the `image` field to the path, e.g. `"images/my-new-diagram.png"`
3. Supported formats: JPG, PNG, GIF, SVG

### Adding Multiple Choice Questions
Add an `options` array to any question:
```json
{
  "q": 11,
  "text": "What colour is a neutral conductor?",
  "marks": 1,
  "image": null,
  "options": ["Brown", "Blue", "Green/Yellow", "Black"],
  "answer": "Blue"
}
```

## Features
- Mobile-friendly design
- QR code for easy sharing
- Reviewer panel with model answers
- Manual mark allocation per question
- Pass/fail calculation (60%)
- Email results
- CSV export
- Edit questions without touching code

## Hosting
This exam is hosted via GitHub Pages. Any changes pushed to the `main` branch will go live automatically.
