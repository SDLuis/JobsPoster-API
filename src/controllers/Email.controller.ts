import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";
import auth from "../config/auth";
import htmlEmail from "../templates/email";

const sendEmail = (req: Request, res: Response) => {
  const storage = multer.diskStorage({
    destination: function (_req: Request, _file: any, cb: any) {
      cb(null, "./Attachments");
    },
    filename: function (_req: Request, file: any, cb: any) {
      cb(null, file.originalname);
    },
  });

  const upload: any = multer({ storage }).single("file");

  upload(req, res, function (err: Error) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200);
  });

  nodemailer.createTestAccount((_err, _accont) => {
    let transporter = nodemailer.createTransport({
      service: auth.Service,
     /* host: auth.Host,
      port: 456,
      secure: true,*/
      auth: {
        user: auth.Email,
        pass: auth.Pass,
      },
    });
    let mailOptions = {
      from: auth.Email,
      to: req.body.email,
      subject: "Interesado en el trabajo",
      text: req.body.message,
      html: htmlEmail(req.body.number, req.body.message),
      attachments: [
        {
          filename: upload.originalname,
          path: req.file?.path,
        },
      ],
    };
    try {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          req.file != null
            ? fs.unlink(req.file?.path, (err) => {
                if (err) {
                  return res.end(err);
                } else {
                }
              })
            : null;
          return res.status(400).send(error);
        } else {
          req.file != null
            ? fs.unlink(req.file?.path, (err) => {
                if (err) {
                  return res.end(err);
                } else {
                }
              })
            : null;
          return res.status(200).send("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log(error)
    }
    
  });
};

export default sendEmail;
