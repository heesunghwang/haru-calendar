-- HARU 이메일 로그인 및 사용자별 일정 저장소
-- Supabase Dashboard > SQL Editor에서 전체를 한 번 실행하세요.

create table if not exists public.user_calendars (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"events":[],"dayNotes":{}}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_calendars enable row level security;

drop policy if exists "Users can read own calendar" on public.user_calendars;
create policy "Users can read own calendar"
on public.user_calendars for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own calendar" on public.user_calendars;
create policy "Users can create own calendar"
on public.user_calendars for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own calendar" on public.user_calendars;
create policy "Users can update own calendar"
on public.user_calendars for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own calendar" on public.user_calendars;
create policy "Users can delete own calendar"
on public.user_calendars for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.user_calendars to authenticated;
revoke all on public.user_calendars from anon;

-- Play 스토어 정책에 맞춰 로그인한 사용자가 앱 안에서 직접 탈퇴할 수 있게 합니다.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public;
revoke all on function public.delete_own_account() from anon;
grant execute on function public.delete_own_account() to authenticated;

