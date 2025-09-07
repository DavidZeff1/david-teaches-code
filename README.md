# David Teaches Code 🎓💻

An interactive coding platform where learners can study programming courses from beginner to pro.  
Courses include **Java, C, Python, and more** with:

- 📖 Explanations
- 🎥 Video tutorials
- 💻 Coding challenges
- 📊 Progress tracking
- 🔒 Subscription system (first section free, premium for full access)

---

## 🚀 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) + [Neon Postgres](https://neon.tech/)
- [NextAuth.js](https://next-auth.js.org/) (authentication)
- [Stripe](https://stripe.com/) (subscriptions)
- [Vercel](https://vercel.com/) (deployment)

---

## 📂 Project Structure

src/
app/ # Next.js App Router pages
components/ # Reusable UI components
lib/ # Helpers (db, auth, utils)
prisma/ # Prisma schema + migrations

yaml
Copy code

---

## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/david-teaches-code.git
   cd david-teaches-code
   Install dependencies
   ```

bash
Copy code
pnpm install

# or npm install

Setup environment

bash
Copy code
cp .env.example .env
Run dev server

bash
Copy code
pnpm dev
Visit http://localhost:3000

📜 License
MIT License — feel free to use this project as inspiration for your own learning platforms.

yaml
Copy code

---

# 🔹 Step C — Add `.env.example`

Create a file `.env.example` (so collaborators know what env vars exist without leaking secrets):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
NEXTAUTH_SECRET="your-secret-key"
STRIPE_SECRET_KEY="your-stripe-key"
```
