const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
const dotenv = require("dotenv");
dotenv.config();
//create a rate limit of 100 requests in every 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1000, "60 s"),
});

module.exports = ratelimit;
