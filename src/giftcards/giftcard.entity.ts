import { IsBoolean, IsDefined, IsNumber, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { QrCode } from '../qrcodes/qrcode.entity';
import { GiftcardPurchase } from '../giftcard-purchases/giftcard-purchase.entity';

@Entity()
export class Giftcard {
  @PrimaryGeneratedColumn('uuid')
  @IsDefined()
  id: string;

  @ManyToOne(() => User, (user: User) => user.giftcards, { eager: true })
  @JoinColumn()
  owner!: User;

  @ManyToOne(() => Store, (store: Store) => store.giftcards, { eager: true })
  @JoinColumn()
  store!: Store;

  @OneToOne(() => QrCode, (qrCode: QrCode) => qrCode.giftcard, {
    nullable: true,
  })
  @JoinColumn()
  qrCode?: QrCode;

  @OneToMany(
    () => GiftcardPurchase,
    (giftcardPurchase: GiftcardPurchase) => giftcardPurchase.giftcard,
  )
  giftcardPurchases: GiftcardPurchase[];

  @Column({ type: 'timestamptz' })
  @IsDefined()
  creationTime!: Date;

  @Column({ type: 'timestamptz' })
  expirationTime?: Date;

  @Column()
  @IsNumber()
  amount!: number;

  @IsNumber()
  @IsOptional()
  protected amountLeft: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  çalculateAmountLeft(): void {
    // TODO: calculate amount left properly
    this.amountLeft = this.amount;
  }

  @Column({ default: false })
  @IsBoolean()
  isUsed: boolean;
}
