import { createHmac } from "crypto"
import { NextFunction, Request, Response } from "express"
import qs from "querystring"
import { prisma } from "../../prisma/client"

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urlParams = req.query

  const ordered: Record<string, any> = {}
  Object.keys(urlParams)
    .sort()
    .forEach((key) => {
      if (key.slice(0, 3) === "vk_") {
        ordered[key] = urlParams[key]
      }
    })

  const stringParams = qs.stringify(ordered)
  const paramsHash = createHmac("sha256", process.env.SECRET_KEY)
    .update(stringParams)
    .digest()
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=$/, "")

  if (paramsHash !== urlParams.sign) {
    return res.status(401).send({
      error: "Not authorized",
    })
  }

  const candidate = await prisma.user.findFirst({
    where: {
      vk_id: urlParams.vk_user_id.toString(),
    },
  })

  if (candidate) {
    // req.user = candidate
    return next()
  }

  const { ref } = urlParams
  const user_ = await prisma.user.findFirst({
    where: { vk_id: ref.toString() },
  })

  const user = await prisma.user.create({
    data: {
      first_name: 'firstname',
      last_name: 'lastname',
      vk_id: urlParams.vk_user_id.toString(),
    },
  })
  // req.user = user

  next()
}

module.exports = authMiddleware
