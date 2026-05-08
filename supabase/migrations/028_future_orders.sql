create table if not exists future_orders (
  id              serial primary key,
  slot            integer not null,
  delivery_date   text not null,
  delivery_year   integer not null,
  delivery_month  integer not null,
  cust_ref        integer not null,
  product_code    text not null default '',
  product_name    text not null default '',
  qty             integer not null default 0,
  unit_price      numeric(12,2) not null default 0,
  total           numeric(14,0) not null default 0,
  source_slot     integer,
  synced_at       timestamptz not null default now()
);

create index if not exists future_orders_delivery_date_idx on future_orders(delivery_date);
create index if not exists future_orders_cust_ref_idx on future_orders(cust_ref);
create index if not exists future_orders_product_code_idx on future_orders(product_code);
