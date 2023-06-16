# About

This is a proof of concept for web push notifications across devices.

## Running the application

This application uses prisma ORM and MySQl -the database can be changed in the Schema install the `prisma/schema.prisma` file.

To use MySql pull and run the container by running

```bash
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql

```

Create the database by first accessing the mySql CLI on the running container by running

```bash
docker exec -it some-mysql mysql -u root -p
```

enter the password then

```SQL

CREATE DATABASE push_poc
```

run the migrations from prisma by executing

```bash
npx prisma migration dev
```

to start the application from the root folder run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the application

1. Fill in the user ID and the description of the push service
2. Opt into notifications and submit the form
3. Send a notification to the desired subscription by clicking the notify button

### Notes

- Push notifications are an experimental feature on the current version of safari and the application MUST be added to the users home screen in order to enable notifications
- Notifications.RequestPermissions() documentation suggests that safari still uses the old callback Syntax, I've not found that to be true
- Push notifications on desktop websites require the browser to be running
