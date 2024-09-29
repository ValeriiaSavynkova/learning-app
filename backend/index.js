const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const router = require('./routes/index.js');
const { startService } = require('./mongo-service.js');
const { todayDate } = require('./config/config.js');
dotenv.config();

const PORT = process.env.PORT;
const origin = process.env.ORIGIN;

const dailyUpdate = async () => {
  const { updateStatistics, addNewDay, deleteYesterday } = await startService();

  await updateStatistics(todayDate());
  await deleteYesterday(todayDate());
  await addNewDay(todayDate());
};

schedule.scheduleJob('0 0 * * *', dailyUpdate);

// const date = new Date(Date.now() + 60 * 1000);
// schedule.scheduleJob(date, dailyUpdate);

app.use(
  cors({
    origin: origin, // Разрешаем запросы только с http://localhost:3000
  })
);

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
