insert into security_user ("active", "login", "password", "system_role")
values (true, 'admin','$2a$10$cWuqqF5j7BS2VB2TPExBTeBDKe9uWjl6cWEfWnrt20vRJqhQaYzi.', 'ADMIN')
on conflict do nothing;