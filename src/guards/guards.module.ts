import { Module } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthRefreshGuard } from './auth-refresh.guard';

@Module({
  providers: [AuthGuard, AuthRefreshGuard],
})
export class GuardsModule {}
