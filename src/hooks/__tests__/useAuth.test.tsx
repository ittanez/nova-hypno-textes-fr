import { renderHook, act } from '@testing-library/react'
import { useAuth, AuthProvider } from '../useAuth'

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ data: null, error: null }))
      }))
    }))
  }
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initializes with loading state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.loading).toBe(true)
    expect(result.current.session).toBe(null)
    expect(result.current.user).toBe(null)
    expect(result.current.isAdmin).toBe(false)
  })

  test('provides login function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.login).toBe('function')
  })

  test('provides logout function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.logout).toBe('function')
  })

  test('provides signup function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.signup).toBe('function')
  })

  test('provides requestAdminAccess function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.requestAdminAccess).toBe('function')
  })

  test('login function calls Supabase signInWithPassword', async () => {
    const { supabase } = await import('@/integrations/supabase/client')
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: null
    })

    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })
    
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  test('signup function calls Supabase signUp', async () => {
    const { supabase } = await import('@/integrations/supabase/client')
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: null, session: null },
      error: null
    })

    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      await result.current.signup('test@example.com', 'password123')
    })
    
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  test('logout function calls Supabase signOut', async () => {
    const { supabase } = await import('@/integrations/supabase/client')
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null })

    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      await result.current.logout()
    })
    
    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})