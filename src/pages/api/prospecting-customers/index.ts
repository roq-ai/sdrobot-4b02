import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { prospectingCustomerValidationSchema } from 'validationSchema/prospecting-customers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getProspectingCustomers();
    case 'POST':
      return createProspectingCustomer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProspectingCustomers() {
    const data = await prisma.prospecting_customer
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'prospecting_customer'));
    return res.status(200).json(data);
  }

  async function createProspectingCustomer() {
    await prospectingCustomerValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.prospecting_customer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
