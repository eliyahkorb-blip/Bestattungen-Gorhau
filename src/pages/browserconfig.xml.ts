import type { APIRoute } from 'astro';
import { withBase } from '../utils/url';

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="${withBase('/img/icon-192.png')}"/>
      <TileColor>#882020</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
