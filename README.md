# Rise-Supabase

## Installation

Follow these steps to set up and run the project:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Supabase
```bash
npx supabase start
```
- Ensure Docker is set up on your PC.
- After running the command, Supabase configuration files will be displayed in the terminal.
- Stop any other Supabase Docker containers before starting:
    ```bash
    docker stop $(docker ps -aq --filter "name=supabase") && docker rm $(docker ps -aq --filter "name=supabase")
    ```

### 3. Set Up Prisma
Push your Prisma schema to the database:
```bash
npx prisma db push
```
Alternatively, you can create a new migration and apply it to your database:
```bash
npx prisma migrate dev --name database_init
```

### 4. Configure Environment Variables
Set up the database connection URL:
```plaintext
DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
```

### 5. Run the Node.js Server
Start the server:
```bash
npm start
```
Seed the database with initial data:
```bash
npx prisma db seed
```

## How to Push Local Database to Cloud

### 1. Get Supabase Database Connection String
Retrieve your database connection string from your Supabase project settings. It will look similar to:
```plaintext
postgres://your_user:your_password@your_host:your_port/your_db_name
```

### 2. Push Prisma Schema to Supabase Cloud
Update your Prisma schema to point to your Supabase cloud database by modifying the `DATABASE_URL` in your `.env` file:
```plaintext
DATABASE_URL=postgres://your_user:your_password@your_host:your_port/your_db_name
```
Push your Prisma schema to the Supabase cloud database:
```bash
npx prisma db push
```
Alternatively, run migrations:
```bash
npx prisma migrate dev --name initial_migration
```

# Rise-Supabase