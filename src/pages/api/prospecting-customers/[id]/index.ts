import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { prospectingCustomerValidationSchema } from 'validationSchema/prospecting-customers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.prospecting_customer
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProspectingCustomerById();
    case 'PUT':
      return updateProspectingCustomerById();
    case 'DELETE':
      return deleteProspectingCustomerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProspectingCustomerById() {
    const data = await prisma.prospecting_customer.findFirst(
      convertQueryToPrismaUtil(req.query, 'prospecting_customer'),
    );
    return res.status(200).json(data);
  }

  async function updateProspectingCustomerById() {
    await prospectingCustomerValidationSchema.validate(req.body);
    const data = await prisma.prospecting_customer.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProspectingCustomerById() {
    const data = await prisma.prospecting_customer.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
