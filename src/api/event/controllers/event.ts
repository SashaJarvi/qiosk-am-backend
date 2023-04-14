/**
 * event controller
 */

import _ from "lodash";
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::event.event', ({ strapi }) =>  ({
  async sendEmail(ctx) {
    const { name, email, message } = ctx.request.body;

    await strapi.plugin('email').service('email').send({
      to: process.env.ADMIN_EMAIL,
      from: email,
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

    // const emailTemplate = {
    //   subject: 'Заявка с сайта qiosk.am',
    //   text: message,
    //   html: `
    //     <table style="width: 100%; border-collapse: collapse">
    //       <tr>
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Name</b></td>
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'>${name}</td>
    //       </tr>
    //       <tr style="background-color: #f8f8f8;">
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Email</b></td>
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'>${email}</td>
    //       </tr>
    //       <tr>
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Message</b></td>
    //         <td style='padding: 10px; border: #e9e9e9 1px solid;'>${message}</td>
    //       </tr>
    //     </table>
    //   `,
    // };
    //
    // console.log(process.env.ADMIN_EMAIL)
    //
    // await strapi.plugins['email'].services.email.sendTemplatedEmail(
    //   {
    //     to: process.env.ADMIN_EMAIL,
    //     from: email,
    //     replyTo: email,
    //   },
    //   emailTemplate,
    // );

    ctx.send({message: 'ok'});
  },
}));
