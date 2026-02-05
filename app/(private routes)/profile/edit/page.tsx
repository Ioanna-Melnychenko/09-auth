'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';

const EditProfilePage = () => {
  const router = useRouter();
  // const user = useAuthStore(state => state.user);
  // const clearIsAuthenticated = useAuthStore(
  //   state => state.clearIsAuthenticated
  // );
  const [user, setUser] = useState<User | null>(null);
  const [newUserName, setNewUserName] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getMe();
        if (fetchedUser) {
          setUser(fetchedUser);
          setNewUserName(fetchedUser.username);
        }
      } catch {
        console.log('');
      }
    };
    fetchUser();
  }, []);

  const handleCancel = () => {
    router.back();
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(event.target.value.trim());
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: newUserName });
      if (user) {
        setUser({ ...user, username: newUserName });
      }
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/cat.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleUserNameChange}
              value={newUserName}
              id="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
