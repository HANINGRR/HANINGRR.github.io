import { Topic } from './types';

export const TOPICS: Topic[] = [
  { 
    id: 'tech-essence', 
    title: '技术本质', 
    enTitle: 'TECH_ESSENCE', 
    description: 'AI 是什么？底层逻辑与数学基础',
    content: [
      {
        heading: '核心定义',
        type: 'text',
        body: '人工智能（AI）是通过计算机模拟人类智能行为（推理、学习、感知、决策）的技术体系，本质是 “数据 + 算法 + 算力” 的协同产物。'
      },
      {
        heading: '技术分层',
        type: 'key-value',
        keyValueData: [
          { label: '基础层', value: '算力（GPU/CPU/专用芯片）、数据（标注数据/开源数据集）' },
          { label: '技术层', value: '算法模型（深度学习、大模型、强化学习、Transformer架构）' },
          { label: '应用层', value: '具体产品（ChatGPT、AI绘画、自动驾驶、智能客服）' }
        ]
      },
      {
        heading: '关键特征',
        type: 'list',
        list: [
          '数据驱动：模型性能依赖海量高质量数据训练',
          '概率性输出：结果是“最优解”而非“绝对正确”（存在“幻觉”风险）',
          '无自主意识：本质是复杂数学模型，不具备人类的情感、意志和自我认知'
        ]
      },
      {
        heading: '通俗类比',
        type: 'text',
        body: 'AI 像“超级学生”——通过学习海量“教材”（数据）掌握规律，再用“解题方法”（算法）应对新问题，但不懂“知识的本质”。'
      }
    ]
  },
  { 
    id: 'core-capabilities', 
    title: '核心能力', 
    enTitle: 'CORE_CAPS', 
    description: 'AI 能做什么？功能边界视角',
    content: [
      {
        heading: '四大维度',
        type: 'text',
        body: 'AI 的能力集中在“感知、理解、生成、决策”四大维度，且呈现“专用智能强、通用智能弱”的特点。'
      },
      {
        heading: '能力解析',
        type: 'key-value',
        keyValueData: [
          { label: '感知能力', value: '识别图像、语音、文字等非结构化数据（如人脸识别）' },
          { label: '理解能力', value: '解析自然语言、提取核心信息（如机器翻译、文本摘要）' },
          { label: '生成能力', value: '创造文本、图像、音频、代码等内容（如ChatGPT、Midjourney）' },
          { label: '决策能力', value: '在特定场景下优化选择（如智能投顾、路径规划）' }
        ]
      },
      {
        heading: '能力边界',
        type: 'columns',
        columns: [
          { title: '擅长', desc: '重复性工作、海量数据处理、规则明确的任务' },
          { title: '短板', desc: '复杂逻辑推理、情感共情、跨领域迁移、创新科研突破' }
        ]
      }
    ]
  },
  { 
    id: 'industry-apps', 
    title: '行业应用', 
    enTitle: 'IND_APPS', 
    description: 'AI 正在改变哪些领域？落地场景',
    content: [
      {
        heading: '典型应用场景',
        type: 'key-value',
        keyValueData: [
          { label: '科技/互联网', value: '代码生成、智能推荐。价值：提升开发效率、优化体验' },
          { label: '医疗健康', value: '辅助诊断、药物研发。价值：降低误诊率、缩短周期' },
          { label: '教育', value: '个性化学习、AI答疑。价值：因材施教、减轻负担' },
          { label: '金融', value: '风控、智能投顾。价值：降低风险、提升效率' },
          { label: '制造业', value: '智能质检、工业机器人。价值：提高产能、降低成本' },
          { label: '日常生活', value: '智能家居、语音助手。价值：简化流程、提升便捷' }
        ]
      },
      {
        heading: '核心趋势',
        type: 'text',
        body: '从“单点应用”走向“全流程渗透”（如 AI 从医疗诊断延伸到患者管理、康复跟踪）。'
      }
    ]
  },
  { 
    id: 'social-impact', 
    title: '社会影响', 
    enTitle: 'SOC_IMPACT', 
    description: '双重作用：机遇与挑战',
    content: [
      {
        heading: '积极影响',
        type: 'list',
        list: [
          '生产力革命：提升各行业效率（如编程效率提升40%）',
          '资源普惠：让优质教育、医疗资源触达偏远地区',
          '解放人力：替代危险、重复、枯燥的工作',
          '创新赋能：催生新产业、新岗位（如AI训练师）'
        ]
      },
      {
        heading: '消极影响',
        type: 'list',
        list: [
          '就业结构冲击：初级岗位需求缩减',
          '数字鸿沟：不同人群使用能力差距扩大',
          '社会公平：算法偏见可能加剧歧视',
          '文化冲击：生成内容对原创文化的冲击'
        ]
      }
    ]
  },
  { 
    id: 'ethical-risks', 
    title: '伦理风险', 
    enTitle: 'ETHIC_RISK', 
    description: 'AI 发展的“红线”在哪里？',
    content: [
      {
        heading: '核心风险',
        type: 'key-value',
        keyValueData: [
          { label: '数据隐私', value: '训练数据可能包含个人隐私，存在泄露风险' },
          { label: '算法黑箱', value: '决策过程不透明，难以追溯错误根源' },
          { label: '版权争议', value: 'AI生成物的版权归属模糊' },
          { label: '滥用风险', value: 'Deepfake造假、AI诈骗、虚假信息传播' },
          { label: '责任界定', value: 'AI出错时，责任主体（开发者/用户/AI）难以界定' }
        ]
      },
      {
        heading: '应对方向',
        type: 'text',
        body: '建立AI伦理规范（如欧盟《AI法案》）、算法透明化、数据合规治理。'
      }
    ]
  },
  { 
    id: 'dev-trends', 
    title: '发展趋势', 
    enTitle: 'DEV_TRENDS', 
    description: 'AI 未来会走向何方？',
    content: [
      {
        heading: '五大演进方向',
        type: 'list',
        list: [
          '从专用到通用：走向通用人工智能（AGI）雏形，具备跨领域能力',
          '模型轻量化：出现适配端侧设备的轻量化模型（如Llama 3小型版）',
          '多模态融合：文本、图像、语音、视频深度融合，贴近人类感知',
          '行业定制化：垂直领域大模型兴起（医疗、法律专用模型）',
          '安全与可控：AI安全、可解释AI（XAI）、对齐技术成为核心'
        ]
      }
    ]
  },
  { 
    id: 'learning-threshold', 
    title: '学习门槛', 
    enTitle: 'LEARN_CURVE', 
    description: '普通人如何掌握AI工具与思维',
    content: [
      {
        heading: '使用层面：零门槛',
        type: 'text',
        body: '工具：ChatGPT（对话）、Midjourney（绘画）、Copilot（编程）。核心技能是“提示工程”——用清晰语言引导AI。'
      },
      {
        heading: '研发层面：专业门槛',
        type: 'list',
        list: [
          '核心技能：数学（线代/概率）、编程（Python/PyTorch）、机器学习理论',
          '学习路径：基础编程 → 机器学习 → 深度学习 → 大模型微调'
        ]
      }
    ]
  },
  { 
    id: 'human-machine', 
    title: '人机关系', 
    enTitle: 'H_M_RELATION', 
    description: '工具、伙伴还是对手？',
    content: [
      {
        heading: '三种视角',
        type: 'key-value',
        keyValueData: [
          { label: '超级工具', value: '人类能力的延伸，放大计算、分析、生成能力' },
          { label: '协作伙伴', value: '形成“人机协同”模式，放大人类核心价值' },
          { label: '非对手', value: 'AI缺乏自主意识和情感，无法替代创新、共情与伦理决策' }
        ]
      },
      {
        heading: '核心原则',
        type: 'text',
        body: '“人类主导，AI辅助”——AI解决“效率问题”，人类聚焦“价值问题”（做什么、为什么做）。'
      }
    ]
  },
];