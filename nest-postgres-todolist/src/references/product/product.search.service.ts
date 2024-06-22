import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from './entities/product.entity';
import ProductSearchResult from './interface/product-search-result';
import ProductSearchBody from './interface/product-search-body';
import ProductSearchCount from './interface/product-search-count';

@Injectable()
export default class ProductSearchService {
  index = 'product';

  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  async indexProduct(product: Product) {
    return this.elasticSearchService.index<
      ProductSearchResult,
      ProductSearchBody
    >({
      index: this.index,
      body: {
        id: product.id,
        name: product.name,
        description: product.description,
        barcode: product.barcode,
      },
    });
  }

  async countProduct(query: string, fields: string[]) {
    const { body } = await this.elasticSearchService.count<ProductSearchCount>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query,
            fields,
          },
        },
      },
    });
    return body.count;
  }

  async removeProduct(productID: number) {
    this.elasticSearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: productID,
          },
        },
      },
    });
  }

  async updateProduct(product: Product) {
    const newBody: ProductSearchBody = {
      id: product.id,
      name: product.name,
      description: product.description,
      barcode: product.barcode,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticSearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: product.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }

  async search(text: string, offset?: number, limit?: number, startId = 0) {
    let separateCount = 0;
    if (startId) {
      separateCount = await this.countProduct(text, ['name', 'description']);
    }
    const { body } =
      await this.elasticSearchService.search<ProductSearchResult>({
        index: this.index,
        from: offset,
        size: limit,
        body: {
          query: {
            bool: {
              must: {
                multi_match: {
                  query: text,
                  fields: ['name', 'description'],
                  fuzziness: 2,
                },
              },
              filter: {
                range: {
                  id: {
                    gt: startId,
                  },
                },
              },
            },
          },
          sort: {
            _score: {
              order: 'desc',
            },
          },
        },
      });
    const count = body.hits.total.value;
    const hits = body.hits.hits;
    const results = hits.map((item) => item._source);
    return {
      count: startId ? separateCount : count,
      results,
    };
  }
}
