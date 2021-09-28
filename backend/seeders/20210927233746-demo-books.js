'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Books', [
      {
        uuid: uuidv4(),
        title: '人を動かす',
        url: 'https://www.amazon.co.jp/gp/product/442210098X',
        detail:
          '邦訳500万部突破の歴史的ベストセラー。人づきあいの根本原則を実例豊かに説き起こし、時代を超えて読み継がれる不朽の名著。あらゆる自己啓発書の原点となったデール・カーネギー不朽の名著。人が生きていく上で身につけるべき人間関係の原則を、長年にわたり丹念に集めた実話と、実践で磨き上げた事例を交え説得力豊かに説き起こす。深い人間洞察とヒューマニズムを根底に据え、人に好かれて人の心を突き動かすための行動と自己変革を促す感動の書。',
        review: 'いい本です',
        reviewerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        title: 'フェイスブック 若き天才の野望',
        url: 'https://www.amazon.co.jp/%E3%83%95%E3%82%A7%E3%82%A4%E3%82%B9%E3%83%96%E3%83%83%E3%82%AF-%E8%8B%A5%E3%81%8D%E5%A4%A9%E6%89%8D%E3%81%AE%E9%87%8E%E6%9C%9B-%E3%83%87%E3%83%93%E3%83%83%E3%83%89-%E3%82%AB%E3%83%BC%E3%82%AF%E3%83%91%E3%83%88%E3%83%AA%E3%83%83%E3%82%AF-ebook/dp/B00F4QOMVI/',
        detail:
          'フェイスブックの若き天才CEO（最高経営責任者）、マーク・ザッカーバーグ。彼が掲げる「フェイスブックで世界をもっとオープンな場所にする！」という揺るぎないビジョンと魅力に、ハーバード大の仲間やシリコンバレーの起業家、ベンチャーキャピタル、大企業の経営者たちが次々と吸い寄せられる。プログラマーはザッカーバーグとともに徹夜でサービスをつくり、ナップスター創業者のション・パーカーは入社し、マイクロソフトのスティーブ・バルマーCEOやヤフーはどうにかして買収しようと、躍起になる。提示される買収金額は8億ドル、10億ドル、20億ドル、150億ドル…と飛躍的に増えたが、それでもザッカーバーグはフェイスブックを売らなかった。本書では、26歳の天才CEOの成功と苦悩、そして野望を生き生きと描き出す',
        review: 'いい本です',
        reviewerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        title: '渋谷ではたらく社長の告白',
        url: 'https://www.amazon.co.jp/gp/product/4344420160',
        detail:
          '21世紀を代表する会社を作りたい――。高校生のときに抱いた起業の夢は、サイバーエージェントの設立により実現した。しかし、社長になった彼を待っていたのは、厳しい現実だった。ITバブルの崩壊、買収の危機、社内外からの激しい突き上げ……。孤独と絶望、そして成功のすべてを赤裸々に告白したノンフィクション。夢を追う人必読の書',
        review: 'いい本です',
        reviewerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        title: '不格好経営―チームDeNAの挑戦',
        url: 'https://www.amazon.co.jp/gp/product/4532318955',
        detail:
          '「それにしても、マッキンゼーのコンサルタントとして経営者にアドバイスをしていた自分が、これほどすったもんだの苦労をするとは……。経営とは、こんなにも不格好なものなのか。だけどそのぶん、おもしろい。最高に。」――創業者が初めて明かす、奮闘の舞台裏',
        review: 'いい本です',
        reviewerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {})
  },
}
