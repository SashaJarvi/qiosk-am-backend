/**
 * event controller
 */

import _ from "lodash";
import { factories } from '@strapi/strapi'
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const i18n = require("../../../i18n-helper");

i18n.init();

export default factories.createCoreController('api::event.event', ({ strapi }) =>  ({
  async sendEmail(ctx) {
    const { name, email, message } = ctx.request.body;

    if (!name) throw new ApplicationError(i18n.__("errors.enter-name"))
    if (!email) throw new ApplicationError(i18n.__("errors.enter-email"))
    if (!message) throw new ApplicationError(i18n.__("errors.enter-message"))

    try {
      await strapi.plugin('email').service('email').send({
        to: process.env.ADMIN_EMAIL,
        from: email,
        replyTo: email,
        subject: 'Заявка с сайта qiosk.am',
        text: message,
        html: `
        <table style="width: 100%; border-collapse: collapse">
          <tr>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Name</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>${name}</td>
          </tr>
          <tr style="background-color: #f8f8f8;">
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Email</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>${email}</td>
          </tr>
          <tr>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Message</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>${message}</td>
          </tr>
        </table>
      `,
      });

      ctx.send({message: 'ok'});
    } catch (e) {
      console.error(e);
      throw new ApplicationError(i18n.__("errors.error"))
    }
  },
}));
