# employeeShifts

# env file keys:

APP_PORT=Enter your speicified PORT
DB_USER=postgres i have used postgreDB
DB_HOST='localhost'
DB_DATABASE=Enter the DB name
DB_PASSWORD=DB Password
DB_PORT=DB port

# PreDefined Tables Create Query

1.
CREATE TABLE IF NOT EXISTS public.assigned_shifts
(
    assignment_id integer NOT NULL DEFAULT nextval('assigned_shifts_assignment_id_seq'::regclass),
    shift_id integer,
    employee_id integer,
    CONSTRAINT assigned_shifts_pkey PRIMARY KEY (assignment_id),
    CONSTRAINT assigned_shifts_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.employees (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT assigned_shifts_shift_id_fkey FOREIGN KEY (shift_id)
        REFERENCES public.shifts (shift_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

2.
CREATE TABLE IF NOT EXISTS public.departments
(
    department_id integer NOT NULL DEFAULT nextval('departments_department_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT departments_pkey PRIMARY KEY (department_id),
    CONSTRAINT departments_name_key UNIQUE (name)
)

3.
CREATE TABLE IF NOT EXISTS public.employees
(
    employee_id integer NOT NULL DEFAULT nextval('employees_employee_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    department_id integer,
    role_id integer,
    available_time_id integer,
    CONSTRAINT employees_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employees_available_time_id_fkey FOREIGN KEY (available_time_id)
        REFERENCES public.time_frames (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT employees_department_id_fkey FOREIGN KEY (department_id)
        REFERENCES public.departments (department_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT employees_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.roles (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

4.
CREATE TABLE IF NOT EXISTS public.roles
(
    role_id integer NOT NULL DEFAULT nextval('roles_role_id_seq'::regclass),
    department_id integer,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (role_id),
    CONSTRAINT roles_department_id_fkey FOREIGN KEY (department_id)
        REFERENCES public.departments (department_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

5.
CREATE TABLE IF NOT EXISTS public.shifts
(
    shift_id integer NOT NULL DEFAULT nextval('shifts_shift_id_seq'::regclass),
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    department_id integer,
    required_skills character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT shifts_pkey PRIMARY KEY (shift_id),
    CONSTRAINT shifts_department_id_fkey FOREIGN KEY (department_id)
        REFERENCES public.departments (department_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

6.
CREATE TABLE IF NOT EXISTS public.time_frames
(
    id integer NOT NULL DEFAULT nextval('time_frames_id_seq'::regclass),
    time_from time without time zone NOT NULL,
    time_to time without time zone NOT NULL,
    description character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT time_frames_pkey PRIMARY KEY (id)
)


# I have assigned Some of the Look up table the insert query for this are mentioned below

1.
INSERT INTO time_frames (time_from, time_to, description) VALUES
('09:00:00', '12:00:00', 'Morning'),
('12:00:00', '15:00:00', 'Afternoon'),
('15:00:00', '18:00:00', 'Evening'),
('18:00:00', '24:00:00', 'Night');

2.
INSERT INTO departments (name)
VALUES 
    ('IT'),
    ('HR'),
    ('MARKETING'),
    ('FINANCE');

3.
INSERT INTO ROLES (DEPARTMENT_ID, NAME, DESCRIPTION)
VALUES 
    (1,'SOFTWAREENGINEER','software engineer'),
    (1,'SYSTEMADMINISTRATOR','system administrator'),
    (1,'NETWORKENGINEER','network engineer'),
    (2,'HRMANAGER','hr manager'),
    (2,'RECRUITMENTSPECIALIST','recruitment specialist'),
    (2,'TRAININGCOORDINATOR','training coordinator'),
    (3,'MARKETINGMANAGER','marketing manager'),
    (3,'MARKETINGCOORDINATOR','marketing coordinator'),
    (3,'DIGITALMARKETINGSPECIALIST','digital marketing specialist'),
    (4,'FINANCIALANALYST','financial analyst'),
    (4,'ACCOUNTANT','accountant'),
    (4,'FINANCIALCONTROLLER','financial controller');



# I have completed the the assigned APIS

The routes Folder consider all the API endpoints and OCntroller folder contains the funtionality

