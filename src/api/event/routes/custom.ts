module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send-email',
      handler: 'event.sendEmail',
    },
  ]
}
