import { useEffect, useState, useMemo } from 'react';
import { getAllProducts, deleteProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import ProductDetail from './ProductDetail';

// Common Components
import Button from '../common/Button';
import Input from '../common/Input';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import Badge from '../common/Badge';
import Card from '../common/Card';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState('Tất cả');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	// Modal states
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const fetchProduct = async () => {
		try {
			setLoading(true);
			const data = await getAllProducts(page, 8);
			setProducts(data.products || []);
			setTotalPages(data.totalPages || 1);
		} catch (err) {
			toast.error('Lỗi khi tải danh sách sản phẩm');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [page]);

	const handleDelete = async () => {
		if (!selectedProduct) return;

		try {
			await deleteProduct(selectedProduct.id);
			setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id));
			toast.success('Xóa sản phẩm thành công');
		} catch (error) {
			toast.error('Xóa thất bại');
		} finally {
			setIsDeleteModalOpen(false);
			setSelectedProduct(null);
		}
	};

	const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (filter === 'Tất cả') return true;
        return product.status === filter;
      })
      .filter((product) => {
        if (!search) return true;
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
  }, [products, filter, search]);

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index) => (page - 1) * 8 + index + 1,
      className: 'w-16'
    },
    {
      title: 'Sản phẩm',
      key: 'name',
      render: (name, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
             {row.image ? (
               <img src={row.image} alt={name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-textSecondary">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </div>
             )}
          </div>
          <span className="font-semibold text-textPrimary">{name}</span>
        </div>
      )
    },
    {
      title: 'Danh mục',
      key: 'category',
    },
    {
      title: 'Giá',
      key: 'price',
      render: (price) => <span className="font-medium text-primary">{Number(price).toLocaleString()} đ</span>
    },
    {
      title: 'Kho',
      key: 'stock',
      render: (stock, row) => (
        <span className={stock < 10 ? 'text-red-500 font-bold' : ''}>
          {stock} {row.unit}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (status) => (
        <Badge variant={status === 'Còn hàng' ? 'green' : 'red'}>
          {status}
        </Badge>
      )
    },
    {
      title: 'Hành động',
      key: 'actions',
      className: 'text-right',
      render: (_, product) => (
        <div className="flex justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-500 hover:bg-blue-50"
            onClick={() => {
              setSelectedProduct(product);
              setIsDetailModalOpen(true);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all rounded-lg active:scale-90"
            onClick={() => {
              setSelectedProduct(product);
              setIsEditModalOpen(true);
            }}
            title="Chỉnh sửa"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-rose-600 hover:bg-rose-50 transition-colors"
            onClick={() => {
              setSelectedProduct(product);
              setIsDeleteModalOpen(true);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      )
    }
  ];

	return (
		<div className='space-y-6'>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
          <h1 className='text-3xl font-bold text-textPrimary tracking-tight'>
            Danh sách sản phẩm
          </h1>
          <p className="text-textSecondary mt-1">Quản lý và theo dõi danh mục hàng hóa của bạn</p>
        </div>
        
        <Button 
          variant="gradient" 
          size="lg" 
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
        >
          Thêm sản phẩm mới
        </Button>
			</div>

      <Card>
        <div className='flex flex-col md:flex-row items-center gap-4 mb-6 justify-between'>
          <div className='flex bg-gray-100 p-1 rounded-xl w-full md:w-auto'>
            {['Tất cả', 'Còn hàng', 'Hết hàng'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-none px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  filter === tab
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className='w-full md:w-80'>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder='Tìm kiếm sản phẩm...'
              icon={<svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/></svg>}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredProducts} 
          loading={loading} 
        />

        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      </Card>

			{/* Modals */}
			<Modal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				title='Thêm sản phẩm mới'
        size="lg"
			>
				<CreateProduct onSuccess={() => { setIsCreateModalOpen(false); fetchProduct(); }} />
			</Modal>

			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title='Chỉnh sửa sản phẩm'
        size="lg"
			>
				<EditProduct productData={selectedProduct} onSuccess={() => { setIsEditModalOpen(false); fetchProduct(); }} />
			</Modal>

			<Modal
				isOpen={isDetailModalOpen}
				onClose={() => setIsDetailModalOpen(false)}
				title='Chi tiết sản phẩm'
        size="md"
			>
				<ProductDetail productData={selectedProduct} />
			</Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${selectedProduct?.name}"? Hành động này không thể hoàn tác.`}
      />
		</div>
	);
};

export default ProductList;
