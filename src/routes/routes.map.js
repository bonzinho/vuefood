import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Cart from '@/pages/Cart'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import MyOrder from '@/pages/Auth/MyOrders'
import DetailOrder from '@/pages/DetailOrder'
import LoadTableCompany from '@/pages/LoadTableCompany'
import PageNotFound from '@/pages/PageNotFound'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultTemplate'),
        children: [
            {
                path: '/',
                component: Home,
                name: 'home',
                meta:{
                    title: 'Home VueFood'
                }
            },
        
            {
                path: '/loja/:companyFlag',
                component: Products,
                name: 'products',
                props: true,
                meta:{
                    title: 'Produtos'
                }
            },
        
            {
                path: '/cart',
                component: Cart,
                name: 'cart',
                meta:{
                    title: 'Carrinho'
                }
            },

            {
                path: '/meus-pedidos',
                component: MyOrder,
                name: 'my.orders',
                meta:{
                    title: 'Meus Pedidos'
                }
            },

            {
                path: '/pedido/:identify',
                component: DetailOrder,
                name: 'order.detail',
                props: true,
                meta:{
                    title: 'Pedido'
                }
            },

            {
                path: '/:token_company/:token_table',
                component: LoadTableCompany,
                name: 'load.table.company',
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
                name: 'login',
                meta:{
                    title: 'Login'
                }
            },
            {
                path: '/register',
                component: Register,
                name: 'register',
                meta:{
                    title: 'Registo'
                }

            },
        ]
    },
    {
        path: '*',
        component: PageNotFound,
        meta:{
            title: 'Página não encontrada'
        }
    }


];

export default routes;