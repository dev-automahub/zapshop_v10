
import React, { useState } from 'react';
import { Customer, User } from '../types';
import { ArrowRight, ShoppingBag, User as UserIcon, Lock, Fingerprint, Phone, Mail, Loader2 } from 'lucide-react';

interface AuthPageProps {
  customers: Customer[];
  users: User[];
  onLogin: (email: string) => void;
  onRegister: (data: Omit<Customer, 'id' | 'avatarUrl'>) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ customers, users, onLogin, onRegister, showToast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief "processing" feel
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isLogin) {
      const userExists = users.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
      const customerExists = customers.some(c => c.email.toLowerCase() === formData.email.toLowerCase());

      if (userExists || customerExists) {
        onLogin(formData.email);
      } else {
        showToast('E-mail não encontrado. Verifique ou crie uma conta.', 'error');
        setIsLoading(false);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        showToast('As senhas não coincidem.', 'error');
        setIsLoading(false);
        return;
      }
      
      const emailExists = customers.some(c => c.email.toLowerCase() === formData.email.toLowerCase());
      const userEmailExists = users.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
      
      if (emailExists || userEmailExists) {
        showToast('Este e-mail já está cadastrado. Faça login.', 'error');
        setIsLogin(true);
        setIsLoading(false);
        return;
      }

      onRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-jewel-deep font-display text-white overflow-hidden h-screen flex flex-col">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          alt="Luxury Shopping" 
          className="w-full h-full object-cover object-center scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqIhlB7egWy8FT372aGpiLh1AA8IWQ-c6dGrk86nyw_l2UJMyfpklNq3XgN9Vz-Y0P3-oP87AThQBVvQsaxwaEIAbqGOwTH8DIotP1Z1cGEjzkYD4psPBTD1jG084KLRyl4Ms1jazAR-Do2mKMyPzv64c13xLdZUroyCZnvMgLSSe32K9rAvob9dynIo_YBz0VYnpHucjW6ZkbnZO6yFq12o-Ucbf9NvU7mtBCIf0WCXqATdA6Svsgb49XUoz6aCAIEqaiNWbXGxc" 
          style={{ filter: 'brightness(0.65) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jewel-deep via-transparent to-black/20"></div>
      </div>

      <main className="relative z-10 h-full flex flex-col justify-between pt-safe-top pb-safe-bottom">
        {/* Header */}
        <header className="pt-12 px-8 text-center animate-fade-in-down">
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-b from-gold/50 to-transparent mb-6">
            <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
              <ShoppingBag className="text-gold h-8 w-8" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3 italic tracking-tight text-white drop-shadow-lg">
            Mari Zap Shop
          </h1>
          <p className="text-sm text-gray-200 font-light tracking-[0.2em] uppercase">
            Sua experiência exclusiva de clube de compras.
          </p>
        </header>

        {/* Main Content / Form */}
        <section className="w-full px-0 sm:px-6 mb-0">
          <div className="w-full rounded-t-[2.5rem] border-t border-white/10 p-8 pb-12 shadow-2xl bg-jewel-deep/75 backdrop-blur-xl">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Registration Fields */}
                {!isLogin && (
                    <div className="space-y-5 animate-fade-in-down">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80 ml-1" htmlFor="name">
                                Nome Completo
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <UserIcon className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                                </div>
                                <input 
                                    className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 focus:outline-none" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Seu nome" 
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80 ml-1" htmlFor="phone">
                                Telefone
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                                </div>
                                <input 
                                    className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 focus:outline-none" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Login/Common Fields */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80 ml-1" htmlFor="email">
                    {isLogin ? 'Usuário / Email' : 'Email'}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {isLogin ? (
                          <UserIcon className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                      ) : (
                          <Mail className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                      )}
                    </div>
                    <input 
                      className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 focus:outline-none" 
                      id="email" 
                      name="email" 
                      placeholder={isLogin ? "Digite seu usuário" : "seu@email.com"}
                      type="text"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80 ml-1" htmlFor="password">
                      Senha
                    </label>
                    {isLogin && <a className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest transition-colors" href="#">Esqueceu?</a>}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                    </div>
                    <input 
                      className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 focus:outline-none" 
                      id="password" 
                      name="password" 
                      placeholder="Digite sua senha" 
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                    <div className="space-y-1 animate-fade-in-down">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/80 ml-1" htmlFor="confirmPassword">
                            Confirmar Senha
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="text-gray-400 group-focus-within:text-gold transition-colors h-5 w-5" />
                            </div>
                            <input 
                                className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:ring-1 focus:ring-gold/50 focus:bg-white/10 transition-all duration-300 focus:outline-none" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Repita a senha" 
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                        </div>
                    </div>
                )}

                {isLogin && (
                    <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center">
                        <input 
                            className="h-4 w-4 bg-white/10 border-white/20 text-gold focus:ring-gold/50 rounded cursor-pointer accent-gold" 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox"
                        />
                        <label className="ml-2 block text-xs text-gray-300 font-medium" htmlFor="remember-me">
                        Lembrar de mim
                        </label>
                    </div>
                    <button className="flex items-center text-gray-400 hover:text-gold transition-colors" type="button">
                        <Fingerprint className="text-xl h-6 w-6" />
                        <span className="text-[10px] uppercase font-bold tracking-widest ml-1">FaceID</span>
                    </button>
                    </div>
                )}

                <button 
                  className="w-full bg-gold hover:bg-gold/90 text-jewel-deep font-extrabold py-4 rounded-2xl shadow-lg shadow-gold/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                      <>
                        <span className="uppercase tracking-widest text-sm">{isLogin ? 'Entrar' : 'Criar Conta'}</span>
                        <ArrowRight className="text-lg h-5 w-5" />
                      </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400 font-medium">
                  {isLogin ? 'Não tem uma conta?' : 'Já possui cadastro?'}
                  <button 
                    onClick={() => { setIsLogin(!isLogin); setFormData({...formData, password: '', confirmPassword: ''}); }}
                    className="text-gold font-bold hover:text-white transition-colors ml-1 uppercase text-xs tracking-wider"
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça Login'}
                  </button>
                </p>
              </div>

              <footer className="mt-8 pt-6 border-t border-white/5 text-center text-[9px] text-gray-500 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Mari Zap Shop • Termos & Privacidade
              </footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
