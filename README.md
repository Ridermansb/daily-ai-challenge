> Resolution for daily.ai [code challenge][0]

This project is hosted on [vercel][vercel-project].

## Getting Started

- Ensure you have **node 20** (can be installed via [nvm][nvm-website])
- Install packages `npm install`

- Create `.env` file with

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> This is the `json-server` URL

- Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

- just execute `npm test`

## Written Questions

**How would you modify your solution to handle real-time updates for a large number of subscribers (e.g., 1 million+)? Consider both frontend and backend implications.?**

> For real-time updates, I typically go with a database like Firebase that handles real-time data sync out of the box, so I can focus more on the application itself. Other options include using WebSockets for real-time communication, long polling, or pulling the data at set intervals, depending on the specific needs and scale of the application

**Describe how you would measure and improve the performance of your application. What metrics would you focus on, and what techniques would you employ?**

> For the front end, I focus on Core Web Vitals metrics to measure performance. Tools like Lighthouse can help track and optimize these metrics. On the backend, slow database queries are often the main issue. To identify and fix these, I use monitoring tools like Datadog or Sentry, which provide insights into performance bottlenecks across the system.

All questions was publish on [Github Discussions Page][1]

<!-- links -->

[0]: https://dailyai.notion.site/Senior-Frontend-Engineer-Take-Home-Project-c230fc7f08ef49ffb690611664d375db?pvs=74
[vercel-project]: https://vercel.com/riderman-de-sousa-barbosas-projects/daily-ai-challenge
[nvm-website]: https://github.com/nvm-sh/nvm
[1]: https://github.com/Ridermansb/daily-ai-challenge/discussions/categories/q-a
