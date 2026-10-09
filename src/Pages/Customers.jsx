import React, { useState ,useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Customers.module.css';
import { useOrders } from "../contexts/OrdersContext";


function Customers() {
  const {
    customers,
    customersLoading: loading,
     error,
    deleteCustomer,
    saveCustomer,
  } = useOrders();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const totalCustomers = customers.length;
  const loyalCustomers = customers.filter(c => c.orders > 20).length;

  const handleSave = () => {
    saveCustomer(editCustomer);
    setSelectedCustomer(null);
    setEditCustomer(null);
  };

  const handleDelete = () => {
    deleteCustomer(selectedCustomer.id);
    setSelectedCustomer(null);
    setConfirmDelete(false);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortAsc(prev => (sortField === field ? !prev : true));
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (sortAsc) return valA > valB ? 1 : -1;
    else return valA < valB ? 1 : -1;
  });

  useEffect( () =>{
    document.title = "Customers";
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>مدیریت مشتری‌ها</h2>
        <input
          className={styles.search}
          type="text"
          placeholder="جستجو بر اساس نام یا ایمیل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.stats}>
        <motion.div className={styles.card} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h4>مجموع مشتری‌ها</h4>
          <p>{totalCustomers}</p>
        </motion.div>
        <motion.div className={styles.card} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h4>مشتری‌های وفادار</h4>
          <p>{loyalCustomers}</p>
        </motion.div>
      </div>

      {loading && <p className={styles.status}>در حال بارگذاری...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>نام</th>
                <th onClick={() => handleSort("email")}>ایمیل</th>
                <th onClick={() => handleSort("createdAt")}>تاریخ عضویت</th>
                <th>تعداد سفارش</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sorted.map(customer => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setEditCustomer(customer);
                      setConfirmDelete(false);
                    }}
                  >
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{new Date(customer.createdAt).toLocaleDateString('fa-IR')}</td>
                    <td>{customer.orders}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selectedCustomer && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modal} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <button className={styles.close} onClick={() => setSelectedCustomer(null)}>&times;</button>
              <img src={editCustomer.avatar} alt="avatar" className={styles.avatar} />
              <label>نام</label>
              <input
                value={editCustomer.name}
                onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
              />
              <label>ایمیل</label>
              <input
                value={editCustomer.email}
                onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
              />
              <label>رمز عبور</label>
              <input
                value={editCustomer.password}
                onChange={(e) => setEditCustomer({ ...editCustomer, password: e.target.value })}
              />
              <div className={styles.modalActions}>
                {!confirmDelete ? (
                  <>
                    <button className={styles.saveBtn} onClick={handleSave}>ذخیره</button>
                    <button className={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>حذف</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleDelete}>بله</button>
                    <button onClick={() => setConfirmDelete(false)}>خیر</button>
                    <span>مطمئنید؟</span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Customers;
