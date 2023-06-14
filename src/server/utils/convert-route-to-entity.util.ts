const mapping: Record<string, string> = {
  meetings: 'meeting',
  organizations: 'organization',
  'prospecting-customers': 'prospecting_customer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
