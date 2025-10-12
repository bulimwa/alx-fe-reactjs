import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';

// Inside <Route path="/profile/*" ...>
<Route
  path="/profile/*"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
>
  <Route path="details" element={<ProfileDetails />} />
  <Route path="settings" element={<ProfileSettings />} />
</Route>
