SET check_function_bodies = false;
CREATE TABLE public.facilities (
    id text NOT NULL,
    name text NOT NULL,
    address jsonb NOT NULL,
    summary text NOT NULL,
    misc_spec jsonb NOT NULL,
    location jsonb NOT NULL,
    panel_cost numeric DEFAULT '250'::numeric,
    panel_total integer DEFAULT 1000 NOT NULL
);
CREATE FUNCTION public.total_panels_reserved(facility public.facilities) RETURNS bigint
    LANGUAGE sql STABLE
    AS $$
  SELECT COALESCE(SUM(panel_reserved_count),0) FROM panel_reservations 
  WHERE facility_id = facility.id
  GROUP BY facility_id
$$;
CREATE TABLE public.panel_reservations (
    user_id text NOT NULL,
    panel_reserved_count integer DEFAULT 0 NOT NULL,
    facility_id text NOT NULL,
    qouted_total_investment numeric DEFAULT 0 NOT NULL,
    reservation_created timestamp without time zone,
    reservation_last_updated timestamp without time zone,
    id text DEFAULT public.gen_random_uuid() NOT NULL
);
CREATE TABLE public.profiles (
    id integer NOT NULL,
    name text,
    birthday date
);
CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;
CREATE TABLE public.users (
    id text DEFAULT public.gen_random_uuid() NOT NULL,
    name text,
    created_account date NOT NULL
);
COMMENT ON TABLE public.users IS 'Basic user tables';
ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);
ALTER TABLE ONLY public.facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.panel_reservations
    ADD CONSTRAINT panel_reservations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.panel_reservations
    ADD CONSTRAINT panel_reservations_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES public.facilities(id) ON UPDATE RESTRICT;
ALTER TABLE ONLY public.panel_reservations
    ADD CONSTRAINT panel_reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT;
