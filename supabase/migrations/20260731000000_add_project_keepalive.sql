-- Minimal database activity endpoint for the scheduled Supabase keep-alive.
-- It deliberately reads no tables, accepts no input, and returns no project data.
create or replace function public.project_keepalive()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select true;
$$;

comment on function public.project_keepalive() is
  'Minimal health check used by the scheduled GitHub Actions keep-alive.';

-- Functions may inherit broad EXECUTE privileges. Make this endpoint explicitly
-- callable only through the low-privilege anonymous Data API role.
revoke all on function public.project_keepalive() from public;
revoke all on function public.project_keepalive() from anon;
revoke all on function public.project_keepalive() from authenticated;
grant execute on function public.project_keepalive() to anon;
