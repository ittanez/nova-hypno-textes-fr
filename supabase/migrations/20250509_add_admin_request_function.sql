
-- Create a function to safely insert admin requests
CREATE OR REPLACE FUNCTION public.insert_admin_request(
  full_name TEXT,
  reason_text TEXT
)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.admin_requests(
    user_id,
    user_email,
    full_name,
    reason
  ) VALUES (
    auth.uid(),
    (SELECT email FROM auth.users WHERE id = auth.uid()),
    full_name,
    reason_text
  );
END;
$$;
