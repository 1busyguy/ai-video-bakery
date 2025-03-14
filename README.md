# AI Video Bakery

A modern AI-powered video creation platform inspired by Hedra.com.

## Features

- Create AI-generated videos from text prompts
- Customize video styles and effects
- Share and export videos in various formats
- Responsive, modern UI

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/
├── src/                        # Source code
│   ├── app/                    # Next.js app router
│   ├── components/             # Reusable components
│   │   ├── home/               # Home page components
│   │   └── layout/             # Layout components
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
│   └── assets/                 # Images, fonts, etc.
```

## Deployment on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel using the "New Project" workflow
3. Vercel will detect it's a Next.js project and set up the build configuration automatically
4. Deploy!

### Environment Variables

For production deployment, make sure to add any necessary environment variables in the Vercel dashboard:

1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" tab
3. Add the variables from your `.env.local` file

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/) 