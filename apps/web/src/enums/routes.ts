export enum RoutesEnum {
  Root = '/',

  Register = '/register',
  Login = '/login',
  LoginVerificationSuccess = '/login/verification-success',
  RecoveryPassword = '/recuperar-senha',
  ChangePassword = 'mudar-senha/:id',
  Products = '/produtos',
  Discounts = '/promocoes',
  Suppliers = '/fornecedores',
  Clients = '/clientes',
  Sales = '/vendas',
  SalesMade = 'vendas-realizadas',
  BillsToPay = '/contas-a-pagar',
  BillsToReceive = '/contas-a-receber',
  Configs = '/configuracoes',
  Budget = '/orcamento',
  BudgetMade = '/orcamento-realizados',
  NotFound = '*',
}
