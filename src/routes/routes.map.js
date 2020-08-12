import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Cart from '@/pages/Cart'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import MyOrder from '@/pages/Auth/MyOrders'
import DetailOrder from '@/pages/DetailOrder'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/',
                component: Home,
                name: 'home'
            },
        
            {
                path: '/loja/:companyFlag',
                component: Products,
                name: 'products',
                props: true,
            },
        
            {
                path: '/cart',
                component: Cart,
                name: 'cart'
            },

            {
                path: '/meus-pedidos',
                component: MyOrder,
                name: 'my.orders'
            },

            {
                path: '/pedido/:identify',
                component: DetailOrder,
                name: 'order.detail',
                props: true,
            },
        ]
    },

    {
        path: '/',
        component: () => import('@/layouts/AuthTemplate'),
        children: [
            {
                path: '/login',
                component: Login,
                name: 'login'
            },
            {
                path: '/register',
                component: Register,
                name: 'register'
            },
        ]
    }


];

export default routes;